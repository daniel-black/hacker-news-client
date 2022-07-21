import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document';

// _document.tsx wraps _app.tsx
class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className='min-h-full overflow-x-hidden bg-slate-100 selection:bg-violet-300'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;