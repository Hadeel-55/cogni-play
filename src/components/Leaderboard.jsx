import { Container, Col, Row, Card, ThemeProvider } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";
import { MemoryMasterContext } from "../context/MemoryMasterContext";
import { useContext } from "react";
import { LeaderboardContext } from "../context/LeaderboardContext";
import { PlayerContext } from "../context/PlayerContext";

function Leaderboard() {
  const {profileTemporary}=useContext(PlayerContext);
  const { overallScore, recentSessions} = useContext(LeaderboardContext);
  const { finalColor, btnTheme } = useContext(ThemeContext);
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={10} md={5}>
          <Card
            style={{
              backgroundColor: "transparent",
              border: btnTheme.border,
              backdropFilter: "blur(15px)",
              color: finalColor,
              transition: "all 0.3s ease-in",
            }}
            className="mb-4"
          >
            <Card.Header>
              <h6>Overall Score</h6>
            </Card.Header>
            <Card.Body>
              <h4 className="fw-bold">{overallScore}</h4>
              <p style={{ fontSize: "12px" }}>
                Aggregate score (demo).Extend with per-game scoring scoring
                easily
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={10} md={5}>
          <Card
            style={{
              backgroundColor: "transparent",
              border: btnTheme.border,
              backdropFilter: "blur(15px)",
              color: finalColor,
              transition: "all 0.3s ease-in",
            }}
          >
            <Card.Header>
              <h6>Recent Sessions</h6>
            </Card.Header>
            <Card.Body>
              {recentSessions && recentSessions.slice(0,5).map((session) => (
                <div style={{fontSize:'13px'}} className="d-flex gap-2" key={session.id}>
                  <span>
                    {session.date} - {session.endTime}
                  </span>
                  <span>Player : {session.name}</span>
                  <span>Time Left : {session.timeLeft || (session.newSession && session.newSession.timeLeft)}</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default Leaderboard;
