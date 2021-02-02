/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import QuizContainer from '../../components/QuizContainer';
import QuizBackground from '../../components/QuizBackground';
import Widget from '../../components/Widget';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';
import AlternativesForm from '../../components/AlternativesForm';
import animationData from '../../Animation/syringe.json';

const framerVariant = {
  show: { opacity: 1, x: '0' },
  hidden: { opacity: 0, x: '-100%' },
};

function LoadingWidget() {
  return (
    <Widget
      as={motion.div}
      transition={{ delay: 0, duration: 1 }}
      variants={framerVariant}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>[Desafio do Loading]</Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  onSubmit,
  awnsers,
  setAwnsers,
  correctText,
  wrongText,
  setScreenState,
}) {
  const questionId = `question__${questionIndex}`;
  const [selectedAlt, SetSelectedAlt] = React.useState(undefined);
  const isCorrect = selectedAlt === question.answer;
  const hasAlternativeSelected = selectedAlt !== undefined;
  const [awnserSubmited, SetAwnserSubmited] = React.useState(false);

  return (
    <Widget>
      <Widget.Header>
        <h3>
          <BackLinkArrow href="/" />
          {`Pergunta ${1} de ${1}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>
          {' '}
          {question.title}
          {' '}
        </h2>
        <p>
          {' '}
          {question.description}
          {' '}
          {' '}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            SetAwnserSubmited(true);

            setTimeout(() => {
              setAwnsers([...awnsers, selectedAlt]);
              onSubmit();
              SetSelectedAlt(undefined);
              SetAwnserSubmited(false);

              if (question.need_hurt) {
                setScreenState(screenStates.HURT);
                setTimeout(() => {
                  setScreenState(screenStates.QUIZ);
                }, 500);
              }
            }, 2_500);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlt === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={awnserSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => { SetSelectedAlt(alternativeIndex); }}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected || awnserSubmited}>
            Confirmar
          </Button>

          {awnserSubmited && isCorrect && <p> {correctText}</p>}
          {awnserSubmited && !isCorrect && <p>{wrongText}</p>}

        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
  HURT: 'HURT',
};

function WidgetResults() {
  return (
    <Widget>
      <Widget.Content>
        <h2>
          “Sabe onde você está, Winston?”
          <br />
          <br />
          “Não. Imagino que no Ministério do Amor.”
          <br />
          <br />
          “Sabe há quanto tempo está aqui?”
          <br />
          <br />
          “Não faço ideia. Dias, semanas, meses... Acho que alguns meses.”
          <br />
          <br />
          “E por que acha que trazemos as pessoas para este lugar?”
          <br />
          <br />
          “Para fazê-las confessar.”
          <br />
          <br />
          “Para fazê-las confessar.”
          <br />
          <br />
          “Para castigá-las.”“Não!”, exclamou O’Brien.
          <br />
          <br />
          Sua voz se modificara extraordinariamente e seu  rosto  assumira  um  aspecto  a  um  só  tempo  ríspido  e  entusiasmado.
          <br />
          “Não! Não é apenas para obter sua confissão nem para castigar você. 
          <br />
          Será que preciso explicar por que o trouxemos para cá? Foi para curá-lo! Para fazerde você uma pessoa equilibrada! Será que é tão difícil assim você entender, Winston,  que  ninguém  sai  deste  lugar  sem  estar  curado?  
          <br />
          Não estamos preocupados com aqueles crimes idiotas que você cometeu. 
          <br />
          O Partido não se interessa  pelo  ato  em  si:  é  só  o  pensamento  que  nos  preocupa.  
          <br />
          Não  nos limitamos a destruir nossos inimigos; nós os transformamos. 
          <br />
        </h2>
      </Widget.Content>
    </Widget>
  );
}

// eslint-disable-next-line react/prop-types
export default function PageQuiz({ externalQuestions, externalBg, externalBg2 }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  // eslint-disable-next-line react/prop-types
  const totalQuestions = externalQuestions.length;
  const [currQuestionIndex, setCurrQuestionIndex] = React.useState(0);
  const question = externalQuestions[currQuestionIndex];
  const [awnsers, setAwnsers] = React.useState([]);
  const backGround = (screenState === screenStates.HURT) ? externalBg2 : externalBg;

  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData,
  };

  function handleSubmitQuiz() {
    const nextQuestion = currQuestionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrQuestionIndex(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 2000);
  }, []);

  return (
    <QuizBackground backgroundImage={backGround}>
      {screenState !== screenStates.HURT && (
      <QuizContainer>

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={currQuestionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            awnsers={awnsers}
            setAwnsers={setAwnsers}
            correctText={question.asnwer_correct_text}
            wrongText={question.asnwer_wrong_text}
            setScreenState={setScreenState}
          />
        )}
        {screenState === screenStates.LOADING && (
          <Widget>
            <Widget.Content>
              <Lottie options={lottieOptions} />
            </Widget.Content>
          </Widget>
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <WidgetResults />}
      </QuizContainer>
      )}
    </QuizBackground>

  );
}

QuestionWidget.propTypes = {

  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  awnsers: PropTypes.arrayOf([null, PropTypes.string]).isRequired,
  setAwnsers: PropTypes.func.isRequired,
};
