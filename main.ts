import { MarkdownPostProcessor, Plugin } from "obsidian";

const markdownPostProcessor: MarkdownPostProcessor = (element) => {
	// Find all links
	const prefix = "app://obsidian.md/";
	const linkElements = element.querySelectorAll("a.internal-link") as NodeListOf<HTMLAnchorElement>;
	for (const el of linkElements) {
		// If the link text is the same as the href (i.e. user hasn't made a explicit title)
		const href = decodeURI(el.href);
		if (href.startsWith(prefix) && href.replace(prefix, "") == el.innerText) {
			// The text should start right after the last '/' character
			const lastIndex = el.innerText.lastIndexOf("/");
			if (lastIndex >= 0) {
				el.innerText = el.innerText.substring(lastIndex + 1);
			}
		}
	}
};

export default class extends Plugin {
	override async onload(): Promise<void> {
		this.registerMarkdownPostProcessor(markdownPostProcessor);
	}
}
