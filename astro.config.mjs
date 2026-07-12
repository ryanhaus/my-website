import { defineConfig } from 'astro/config';
import mermaid from 'astro-mermaid';
import remarkGemoji from 'remark-gemoji';

export default defineConfig({
    site: 'https://ryanha.us',
    integrations: [
        mermaid({
            theme: 'default',
            autoTheme: true
        }),
    ],

    markdown: {
        remarkPlugins: [
            remarkGemoji,
        ],
    },
});
