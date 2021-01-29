import styled from 'styled-components'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import db from '../style_db.json'




export default function Home() {
  return(
  <QuizBackground backgroundImage={db.bg}>

    <QuizContainer>
      <Widget>
        <Widget.Header>
          <h1>{db.title}</h1>
        </Widget.Header>

        <Widget.Content>
          <h1>{db.title}</h1>
        </Widget.Content>
      </Widget>
    </QuizContainer>

    <GitHubCorner projectUrl="https://www.alura.com.br/imersao-react-next-js/aula01-react-nextjs-aluraquiz?utm_source=ActiveCampaign&utm_medium=email&utm_content=Imers%C3%A3o+React+Next+js%3A+Primeira+aula+no+ar%21&utm_campaign=%5BIMERS%C3%83O+REACT+2+0%5D+%28Aula%29+01"/>
    <Footer />
  </QuizBackground>
  )
}
