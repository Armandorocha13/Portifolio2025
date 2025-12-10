import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

interface PropsPlanetaRotacionando {
  width?: number
  height?: number
  className?: string
}

/**
 * Componente PlanetaRotacionando - Planeta Terra em wireframe com rotação automática
 * 
 * Renderiza um globo terrestre em estilo wireframe usando D3.js e Canvas
 * O planeta rotaciona automaticamente sem interação do usuário
 * Carrega dados geográficos do Natural Earth para renderizar continentes
 * 
 * @param width - Largura do canvas (padrão: 800px)
 * @param height - Altura do canvas (padrão: 600px)
 * @param className - Classes CSS adicionais
 */
export default function PlanetaRotacionando({ width = 800, height = 600, className = "" }: PropsPlanetaRotacionando) {
  const refCanvas = useRef<HTMLCanvasElement>(null)
  const [estaCarregando, setEstaCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    if (!refCanvas.current) return

    const canvas = refCanvas.current
    const contexto = canvas.getContext("2d")
    if (!contexto) return

    // Configuração de dimensões responsivas
    const larguraContainer = Math.min(width, window.innerWidth - 40)
    const alturaContainer = Math.min(height, window.innerHeight - 100)
    const raio = Math.min(larguraContainer, alturaContainer) / 2.5

    const dpr = window.devicePixelRatio || 1
    canvas.width = larguraContainer * dpr
    canvas.height = alturaContainer * dpr
    canvas.style.width = `${larguraContainer}px`
    canvas.style.height = `${alturaContainer}px`
    contexto.scale(dpr, dpr)

    // Cria projeção e gerador de caminho para Canvas
    const offsetVertical = -80 // Move o planeta para cima
    const projecao = d3
      .geoOrthographic()
      .scale(raio)
      .translate([larguraContainer / 2, alturaContainer / 2 + offsetVertical])
      .clipAngle(90)

    const caminho = d3.geoPath().projection(projecao).context(contexto)

    const pontoNoPoligono = (ponto: [number, number], poligono: number[][]): boolean => {
      const [x, y] = ponto
      let dentro = false

      for (let i = 0, j = poligono.length - 1; i < poligono.length; j = i++) {
        const [xi, yi] = poligono[i]
        const [xj, yj] = poligono[j]

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          dentro = !dentro
        }
      }

      return dentro
    }

    const pontoNaCaracteristica = (ponto: [number, number], feature: any): boolean => {
      const geometria = feature.geometry

      if (geometria.type === "Polygon") {
        const coordenadas = geometria.coordinates
        // Verifica se o ponto está no anel externo
        if (!pontoNoPoligono(ponto, coordenadas[0])) {
          return false
        }
        // Verifica se o ponto está em algum buraco (anéis internos)
        for (let i = 1; i < coordenadas.length; i++) {
          if (pontoNoPoligono(ponto, coordenadas[i])) {
            return false // Ponto está em um buraco
          }
        }
        return true
      } else if (geometria.type === "MultiPolygon") {
        // Verifica cada polígono no MultiPolygon
        for (const poligono of geometria.coordinates) {
          // Verifica se o ponto está no anel externo
          if (pontoNoPoligono(ponto, poligono[0])) {
            // Verifica se o ponto está em algum buraco
            let emBuraco = false
            for (let i = 1; i < poligono.length; i++) {
              if (pontoNoPoligono(ponto, poligono[i])) {
                emBuraco = true
                break
              }
            }
            if (!emBuraco) {
              return true
            }
          }
        }
        return false
      }

      return false
    }

    const gerarPontosNoPoligono = (feature: any, espacamentoPontos = 16) => {
      const pontos: [number, number][] = []
      const limites = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = limites

      const tamanhoPasso = espacamentoPontos * 0.08
      let pontosGerados = 0

      for (let lng = minLng; lng <= maxLng; lng += tamanhoPasso) {
        for (let lat = minLat; lat <= maxLat; lat += tamanhoPasso) {
          const ponto: [number, number] = [lng, lat]
          if (pontoNaCaracteristica(ponto, feature)) {
            pontos.push(ponto)
            pontosGerados++
          }
        }
      }

      console.log(
        `[v0] Gerados ${pontosGerados} pontos para característica terrestre:`,
        feature.properties?.featurecla || "Land",
      )
      return pontos
    }

    interface DadosPonto {
      lng: number
      lat: number
      visible: boolean
    }

    const todosPontos: DadosPonto[] = []
    let caracteristicasTerrestres: any

    const renderizar = () => {
      // Limpa o canvas
      contexto.clearRect(0, 0, larguraContainer, alturaContainer)

      const escalaAtual = projecao.scale()
      const fatorEscala = escalaAtual / raio
      const opacidadePlaneta = 0.6 // Opacidade reduzida

      // Desenha o oceano (fundo do globo)
      contexto.beginPath()
      contexto.arc(larguraContainer / 2, alturaContainer / 2 + offsetVertical, escalaAtual, 0, 2 * Math.PI)
      contexto.fillStyle = "#000000"
      contexto.globalAlpha = opacidadePlaneta
      contexto.fill()
      contexto.strokeStyle = "#ffffff"
      contexto.lineWidth = 2 * fatorEscala
      contexto.stroke()
      contexto.globalAlpha = 1

      if (caracteristicasTerrestres) {
        // Desenha a grade (graticule)
        const grade = d3.geoGraticule()
        contexto.beginPath()
        caminho(grade())
        contexto.strokeStyle = "#ffffff"
        contexto.lineWidth = 1 * fatorEscala
        contexto.globalAlpha = 0.25 * opacidadePlaneta
        contexto.stroke()
        contexto.globalAlpha = 1

        // Desenha os contornos das terras
        contexto.beginPath()
        caracteristicasTerrestres.features.forEach((feature: any) => {
          caminho(feature)
        })
        contexto.strokeStyle = "#ffffff"
        contexto.lineWidth = 1 * fatorEscala
        contexto.globalAlpha = opacidadePlaneta
        contexto.stroke()
        contexto.globalAlpha = 1

        // Desenha os pontos (pontos meio-tom)
        todosPontos.forEach((ponto) => {
          const projetado = projecao([ponto.lng, ponto.lat])
          if (
            projetado &&
            projetado[0] >= 0 &&
            projetado[0] <= larguraContainer &&
            projetado[1] >= 0 &&
            projetado[1] <= alturaContainer
          ) {
            contexto.beginPath()
            contexto.arc(projetado[0], projetado[1], 1.2 * fatorEscala, 0, 2 * Math.PI)
            contexto.fillStyle = "#999999"
            contexto.globalAlpha = opacidadePlaneta
            contexto.fill()
            contexto.globalAlpha = 1
          }
        })
      }
    }

    const carregarDadosMundiais = async () => {
      try {
        setEstaCarregando(true)

        const resposta = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        )
        if (!resposta.ok) throw new Error("Falha ao carregar dados terrestres")

        caracteristicasTerrestres = await resposta.json()

        // Gera pontos para todas as características terrestres
        let totalPontos = 0
        caracteristicasTerrestres.features.forEach((feature: any) => {
          const pontos = gerarPontosNoPoligono(feature, 16)
          pontos.forEach(([lng, lat]) => {
            todosPontos.push({ lng, lat, visible: true })
            totalPontos++
          })
        })

        console.log(`[v0] Total de pontos gerados: ${totalPontos} em ${caracteristicasTerrestres.features.length} características terrestres`)

        renderizar()
        setEstaCarregando(false)
      } catch (err) {
        setErro("Falha ao carregar dados do mapa terrestre")
        setEstaCarregando(false)
      }
    }

    // Configuração da rotação automática (sem interação do usuário)
    const rotacao: [number, number] = [0, 0]
    const velocidadeRotacao = 0.2 // Velocidade de rotação em graus por frame

    /**
     * Função de rotação - atualiza o ângulo de rotação e re-renderiza
     */
    const rotacionar = () => {
      rotacao[0] += velocidadeRotacao
      projecao.rotate(rotacao)
      renderizar()
    }

    // Timer para animação contínua da rotação
    const timerRotacao = d3.timer(rotacionar)

    // Carrega os dados mundiais
    carregarDadosMundiais()

    // Limpeza
    return () => {
      timerRotacao.stop()
    }
  }, [width, height])

  if (erro) {
    return (
      <div className={`dark flex items-center justify-center bg-card rounded-2xl p-8 ${className}`}>
        <div className="text-center">
          <p className="dark text-destructive font-semibold mb-2">Erro ao carregar visualização da Terra</p>
          <p className="dark text-muted-foreground text-sm">{erro}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={refCanvas}
        className="w-full h-auto rounded-2xl bg-background dark"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  )
}

