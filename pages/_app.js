import '../styles/global.css';

function App({ Component, pageProps }) {
	console.log('app' + pageProps);
	return <Component {...pageProps} />;
}
App.getInitialProps = async ({ Component, ctx }) => {
	const pageProps = Component.getInitialProps
		? await Component.getInitialProps(ctx)
		: {};
	if (Object.keys(pageProps).length > 0) {
		return { pageProps };
	} else {
		return {};
	}
};

export default App;
