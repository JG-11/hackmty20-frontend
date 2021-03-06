import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import { useState } from 'react'

import { InputGroup, FormControl, Button, Container, Row, Col, Alert, Image } from 'react-bootstrap'
import PacmanLoader from "react-spinners/PacmanLoader"

import List from './../components/List'
import { sendUsers } from './../API'


let user = ''
let aux = null

const Home = () => {
  const [data, setData] = useState([])
  const [showUsers, setShowUsers] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)

  const setUser = event => {
    user = event.target.value

    setShowUsers(false)
  }

  const addUser = () => {
    data.push(user.toLowerCase())
    setData(data)

    aux = user

    user = ''

    setShowAlert(true)

    setTimeout(() => setShowAlert(false), 2000)
  }

  const showList = () => {
    setShowUsers(!showUsers)
  }

  const analyzeUsers = async () => {
    setIsLoading(true)

    if(showUsers) {
      setShowUsers(!showUsers)
    }

    const result = await sendUsers(data)

    setResults(result)

    setIsLoading(false)
  }

  const resetData = () => {
    Router.reload()
  }

  return (
    <div className="container">
      <Head>
        <title>HackMTY 2020</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Tinder Hub <span role="img" aria-label="fire">🔥</span></h1>

        <p className="code">HackMTY 2020</p>

        <Alert key={0} variant={"success"} show={showAlert}>
          { aux } added successfully
        </Alert>

        <InputGroup className="mb-3">
          <FormControl
            placeholder="GitHub username"
            aria-label="GitHub username"
            aria-describedby="basic-addon2"
            onChange={event => { setUser(event) }}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={addUser}>Add</Button>
          </InputGroup.Append>
        </InputGroup>

        <Container>
          <Row>
            {
              data && data.length != 0 && 
              <Col md="auto" xs="auto">
                <Button variant="info" onClick={showList}>
                {
                  showUsers ? "Hide list" : "Show list"
                }
                </Button>
              </Col>
            }
            {
              data && data.length != 0 &&
              <Button variant="warning" onClick={resetData}>Reset</Button>
            }
            {
              data && data.length >= 2 &&
              <Col>
                <Button variant="success" onClick={analyzeUsers}>
                  Analyze Users
                </Button>
              </Col>
            }
          </Row>
          <br />
        </Container>

        <Link href="/profile">
          <Button variant="link">
            Visit User map
          </Button>
        </Link>
        
        <PacmanLoader
          size={50}
          color={"#00a4bd"}
          loading={isLoading}
        />

        {
          results && <h1 className="match">Team match: {results['total']}%</h1>
        }

        {
          showUsers && <List data={data} />
        }

        {
          results && results['combinations'] && results['combinations'].map(combination => {
            return (
              <Container>
                <br />
                <Row>
                  <Col md={{ span: 6, offset: 3 }}>
                    <Image
                      src={combination['avatar'] ? combination['avatar'] : `https://ui-avatars.com/api/?name=${combination['user_name']}&size=250`}
                      width={250}
                      height={250}
                      roundedCircle
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6 className="title">{combination['user_name']}</h6>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="description">The greater match is with <strong>{combination['person']}</strong>, with a total of <strong>{combination['ratio']}%</strong></p>
                  </Col>
                </Row>
                <hr />
              </Container>
            )
          })
        }
      </main>

      <footer>
        <strong>
          Coded by Empty File
        </strong>
        <span role="img" aria-label="icon">🚀</span>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .match {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          color: #00af3a;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
          text-align: center;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Home
