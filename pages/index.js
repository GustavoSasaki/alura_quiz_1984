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
import Input from '../src/components/Input';
import db from '../style_db.json';
import Button from '../src/components/Button';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>

      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>

            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                onChange={(event) => { setName(event.target.value); }}
                placeholder="Nome do cidadão"
              />

              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
      </QuizContainer>

      <GitHubCorner projectUrl="https://www.alura.com.br/imersao-react-next-js/aula01-react-nextjs-aluraquiz?utm_source=ActiveCampaign&utm_medium=email&utm_content=Imers%C3%A3o+React+Next+js%3A+Primeira+aula+no+ar%21&utm_campaign=%5BIMERS%C3%83O+REACT+2+0%5D+%28Aula%29+01" />
      <Footer />
    </QuizBackground>
  );
}
