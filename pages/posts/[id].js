import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilsStyle from '../../styles/utils.module.css';

export default function Post({ postData }) {
	return !postData ? (
		<div>{'not found'}</div>
	) : (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1 className={utilsStyle.headingXl}>{postData.title}</h1>
				<div className={utilsStyle.lightText}>
					<Date dateString={postData.date}></Date>
					Author: COGD.THIEN
				</div>
				<div
					dangerouslySetInnerHTML={{
						__html: postData.contentHtml,
					}}></div>
			</article>
		</Layout>
	);
}

export async function getStaticPaths() {
	const paths = await getAllPostIds();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id);

	return {
		props: {
			postData,
		},
	};
}
