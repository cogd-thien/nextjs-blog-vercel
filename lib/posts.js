import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
	//Get file names under /posts
	const files = fs.readdirSync(postsDirectory);

	const allPostsData = files.map((fileName) => {
		const fullPath = path.join(postsDirectory, fileName);
		const id = fileName.replace(/\.md$/, '');
		const content = fs.readFileSync(fullPath, 'utf-8');

		const matterContent = matter(content);
		return {
			id,
			...matterContent.data,
			content,
		};
	});

	return allPostsData?.sort(({ date: a }, { date: b }) => {
		if (a < b) {
			return 1;
		} else if (a > b) {
			return -1;
		} else {
			return 0;
		}
	});
}

export function getAllPostIds() {
	const postFiles = fs.readdirSync(postsDirectory);

	return postFiles.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ''),
			},
		};
	});
}

export async function getPostData(id) {
	const fullPath = path.join(postsDirectory, `${id}.md`);

	const fileContent = fs.readFileSync(fullPath, 'utf-8');

	const matterResult = matter(fileContent);
	const processedContent = await remark()
		.use(html)
		.process(matterResult.content);
	const contentHtml = processedContent.toString();

	return {
		id,
		...matterResult.data,
		contentHtml,
	};
}
