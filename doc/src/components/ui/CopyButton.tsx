import React from 'react';
import { Button } from './button';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CopyButton({ text, className }: { text: string; className?: string }) {
	const [copied, setCopied] = React.useState(false);
	const handleCopy = async () => {
		if (copied) return;
		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			className={cn('text-gray-400', className)}
			onClick={handleCopy}
		>
			{!copied ? <Copy className="h-4 w-4" /> : <Check className="h-4 w-4 " />}
		</Button>
	);
}
