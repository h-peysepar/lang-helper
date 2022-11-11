import Head from 'next/head';
import React from 'react';

interface Props {}

function AppHead(props: Props) {
  return (
    <Head>
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='icons/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='icons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='icons/favicon-16x16.png'
      />
      <link rel='manifest' href='/manifest.json' />
      <link
        rel='mask-icon'
        href='icons/safari-pinned-tab.svg'
        color='#5bbad5'
      />
      <meta name='msapplication-TileColor' content='#da532c' />
      <meta name='theme-color' content='#000000'></meta>
    </Head>
  );
}

export default AppHead;
