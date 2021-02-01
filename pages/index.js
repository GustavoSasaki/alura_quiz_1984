import React from 'react';
import { useRouter } from 'next/router';
// eslint-disable-next-line no-unused-vars
import styled from 'styled-components';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
// eslint-disable-next-line import/no-named-as-default
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import db from '../db.json';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const regex = /https:\/\/(.+)\.(.+)\.vercel.app\//

  const framerVariant = {
    show: { opacity: 1, x: '0' },
    hidden: { opacity: 0, x: '-100%' },
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>{db.title}</title>
      </Head>

      <QuizContainer>
        <Widget
          as={motion.div}
          transition={{ delay: 0, duration: 0.5 }}
          variants={framerVariant}
          initial="hidden"
          animate="show"
        >
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

        <Widget
          as={motion.div}
          transition={{ delay: 0, duration: 1 }}
          variants={framerVariant}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <ul>
              <h1> Outros Quizzes: </h1>
              {db.external.map((link) => {
                // eslint-disable-next-line no-unused-vars
                const [_, author, quizName] = regex.exec(link);

                return (
                  <li key={link}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${author}___${quizName}`}
                    >
                      {`${author}/${quizName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.div}
          transition={{ delay: 0, duration: 1.5 }}
          variants={framerVariant}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <Footer />
          </Widget.Content>
        </Widget>
      </QuizContainer>

      <GitHubCorner projectUrl="https://www.alura.com.br/imersao-react-next-js/aula01-react-nextjs-aluraquiz?utm_source=ActiveCampaign&utm_medium=email&utm_content=Imers%C3%A3o+React+Next+js%3A+Primeira+aula+no+ar%21&utm_campaign=%5BIMERS%C3%83O+REACT+2+0%5D+%28Aula%29+01" />
    </QuizBackground>
  );
}
