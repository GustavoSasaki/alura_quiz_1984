import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import QuizContainer from '../../components/QuizContainer';
import QuizBackground from '../../components/QuizBackground';
import Widget from '../../components/Widget';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';
import AlternativesForm from '../../components/AlternativesForm';
import animationData from '../../Animation/loading-animation.json';

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData,
};

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>[Desafio do Loading]</Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  awnsers,
  setAwnsers,
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
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
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
            }, 3_000);
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

          {awnserSubmited && isCorrect && <p>Ok, vamos analizar sua resposta</p>}
          {awnserSubmited && !isCorrect && <p>Ok, sua resposta é peculiar ...</p>}

        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

function WidgetResults({
  // eslint-disable-next-line react/prop-types
  awnsers,
}) {
  return (
    <Widget>
      <Widget.Content>
        <p> FIM POHA </p>
      </Widget.Content>
    </Widget>
  );
}

// eslint-disable-next-line react/prop-types
export default function PageQuiz({ externalQuestions, externalBg }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  // eslint-disable-next-line react/prop-types
  const totalQuestions = externalQuestions.length;
  const [currQuestionIndex, setCurrQuestionIndex] = React.useState(0);
  const question = externalQuestions[currQuestionIndex];
  const [awnsers, setAwnsers] = React.useState([]);
  const backGround = externalBg;

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
    }, 1 * 1000);
  }, []);

  return (
    <QuizBackground backgroundImage={backGround}>
      <QuizContainer>

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={currQuestionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            awnsers={awnsers}
            setAwnsers={setAwnsers}
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
        {screenState === screenStates.RESULT && <WidgetResults awnsers={awnsers} />}
      </QuizContainer>
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
