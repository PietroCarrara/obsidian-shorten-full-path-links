import { MarkdownPostProcessor, Plugin } from "obsidian";

const markdownPostProcessor: MarkdownPostProcessor = (element) => {
	const linkElements = element.querySelectorAll("a.internal-link") as NodeListOf<HTMLAnchorElement>;
	for (const linkElement of linkElements) {
		const lastIndex = linkElement.innerText.lastIndexOf("/");
		if (lastIndex < 0) {
			continue;
		}
		// The text should start right after the last '/'
		linkElement.innerText = linkElement.innerText.substring(lastIndex + 1);
	}
};

export default class extends Plugin {
	override async onload(): Promise<void> {
		// this.registerEditorExtension(editorExtension);
		this.registerMarkdownPostProcessor(markdownPostProcessor);
	}
}
