import React from 'react';
import { useRouter } from 'next/router';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components';
import Head from 'next/head';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
// eslint-disable-next-line import/no-named-as-default
import QuizContainer from '../src/components/QuizContainer';
import db from '../style_db.json';
import { route } from 'next/dist/next-server/server/router';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <h1>
          {db.title}
        </h1>
      </Head>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
            <h1>{db.title}</h1>
          </Widget.Content>

          <form onSubmit={function (event) {
            event.preventDefault();
            router.push(`/quiz?name=${event.target.name}`);
          }}
          >
            <input
              onChange={function (event) {
                setName(event.target.value);
              }}
              placeholder="Nome do cidadão"
            />

            <button type="submit" disabled={name.length === 0}>
              Jogar 
              {name}
            </button>
          </form>
        </Widget>
      </QuizContainer>

      <GitHubCorner projectUrl="https://www.alura.com.br/imersao-react-next-js/aula01-react-nextjs-aluraquiz?utm_source=ActiveCampaign&utm_medium=email&utm_content=Imers%C3%A3o+React+Next+js%3A+Primeira+aula+no+ar%21&utm_campaign=%5BIMERS%C3%83O+REACT+2+0%5D+%28Aula%29+01" />
      <Footer />
    </QuizBackground>
  );
}
