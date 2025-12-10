import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

/**
 * Componente Cabecalho - Cabeçalho fixo com navegação
 * 
 * Cabeçalho responsivo com menu mobile e desktop
 * Muda de estilo quando o usuário faz scroll (backdrop blur e borda)
 * Inclui links de navegação e botão de currículo
 */
export function Cabecalho() {
	// Estado para controlar abertura/fechamento do menu mobile
	const [aberto, setAberto] = React.useState(false);
	// Detecta se o usuário fez scroll (muda estilo do cabeçalho)
	const rolou = useScroll(10);

	const links = [
		{
			label: 'Sobre',
			href: '#sobre',
		},
		{
			label: 'Habilidades',
			href: '#habilidades',
		},
		{
			label: 'Projetos',
			href: '#projetos',
		},
		{
			label: 'Contato',
			href: '#contato',
		},
	];

	React.useEffect(() => {
		if (aberto) {
			// Desabilita o scroll
			document.body.style.overflow = 'hidden';
		} else {
			// Reabilita o scroll
			document.body.style.overflow = '';
		}

		// Limpeza quando o componente é desmontado
		return () => {
			document.body.style.overflow = '';
		};
	}, [aberto]);

	return (
		<header
			className={cn(
				'sticky top-0 z-50 mx-auto w-full max-w-5xl md:rounded-md md:transition-all md:ease-out',
				{
					'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow':
						rolou && !aberto,
					'bg-background/90': aberto,
				},
			)}
		>
			{/* Silver Border */}
			<div 
				className="absolute inset-0 rounded-md pointer-events-none"
				style={{
					background: 'linear-gradient(90deg, #94a3b8, #e2e8f0, #94a3b8)',
					backgroundSize: '200% 100%',
					animation: 'neon-border 3s ease infinite',
					padding: '1px',
					WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
					WebkitMaskComposite: 'xor',
					mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
					maskComposite: 'exclude',
				}}
			>
				<div className="w-full h-full rounded-md bg-background/95 backdrop-blur-lg"></div>
			</div>
			<nav
				className={cn(
					'relative z-10 flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out',
					{
						'md:px-2': rolou,
					},
				)}
			>
				<a
					href="#"
					className="font-mono text-lg font-semibold tracking-tight hover:scale-105 transition-transform"
				>
					<span className="text-foreground">&lt;</span>
					<span className="text-muted-foreground">AeroCode</span>
					<span className="text-foreground">/&gt;</span>
				</a>
				<div className="hidden items-center gap-8 md:flex">
					{links.map((link, i) => (
						<a
							key={i}
							href={link.href}
							className="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							<span className="mono text-xs text-foreground mr-1">
								0{i + 2}.
							</span>
							{link.label}
						</a>
					))}
					<Button variant="outline" size="sm" className="ml-4">
						Currículo
					</Button>
				</div>
				<Button size="icon" variant="outline" onClick={() => setAberto(!aberto)} className="md:hidden">
					<MenuToggleIcon open={aberto} className="size-5" duration={300} />
				</Button>
			</nav>

			<div
				className={cn(
					'bg-background/90 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden',
					aberto ? 'block' : 'hidden',
				)}
			>
				<div
					data-slot={aberto ? 'open' : 'closed'}
					className={cn(
						'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
						'flex h-full w-full flex-col justify-between gap-y-2 p-4',
					)}
				>
					<div className="grid gap-y-2">
						{links.map((link, index) => (
							<a
								key={link.label}
								className={buttonVariants({
									variant: 'ghost',
									className: 'justify-start text-2xl font-medium',
								})}
								href={link.href}
								onClick={() => setAberto(false)}
							>
								<span className="mono text-sm text-muted-foreground mr-2">
									0{index + 2}.
								</span>
								{link.label}
							</a>
						))}
					</div>
					<div className="flex flex-col gap-2">
						<Button variant="outline" size="lg" className="w-full">
							Currículo
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}

