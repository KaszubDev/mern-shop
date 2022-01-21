import styled from 'styled-components';
import './App.css'

const Header = styled.header`
  width: 100%;
  height: 100px;
  background-color: #252525;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 700;
`

const Footer = styled.footer`
  background-color: #000;
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`

const Main = styled.main`
  min-height: 600px;
`

function App() {
  return (
    <>
      <Header>
        Real Big Shop
      </Header>
      <Main>

      </Main>
      <Footer>
        Happy coding!
      </Footer>
    </>
  );
}

export default App;
