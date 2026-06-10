import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { MemoryMasterContext } from "../context/MemoryMasterContext";
import { PlayerContext } from "../context/PlayerContext";
import { ColorFocusGameContext } from "../context/ColorFocusGameContext";
import { LeaderboardContext } from "../context/LeaderboardContext";

function Play() {
  const { profileTemporary, timer } = useContext(PlayerContext);
  const { btnTheme, finalColor } = useContext(ThemeContext);
  const {
    handleOptionClick,
    score,
    currentText,
    currentColor,
    shuffledOption,
    mistakes,
    handlerestColorGame,
  } = useContext(ColorFocusGameContext);
  const {
    isDisplaySequence,
    gameStatus,
    activeCardId,
    handleCardClick,
    userSequence,
    sequence,
    resetGame,
    startGame,
    cards,
    level,
    maxLevels,
    difficutyLevels,
    difficulty,
  } = useContext(MemoryMasterContext);
  const { handleFinish, handleLeaderboard } = useContext(LeaderboardContext);

  const navigate = useNavigate();
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(() => {
    if (timer === 0) {
      navigate("/");
    }
  }, [timer, navigate]);

  return (
    <Container className="pb-5">
      <Row>
        <Col>
          <Card
            className="p-3"
            style={{
              backgroundColor: "transparent",
              border: btnTheme.border,
              backdropFilter: "blur(15px)",
              color: finalColor,
              transition: "all 0.3s ease-in",
            }}
          >
            <Card.Header>Playing as {profileTemporary.name}</Card.Header>
            <Card.Body>
              <Row className="justify-content-between">
                <Col xs="auto">
                  Timer {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </Col>
                <Col xs="auto">
                  <Badge
                    className="text-align-center bg-warning py-2 px-3 "
                    style={{ fontSize: "0.9rem" }}
                  >
                    {difficutyLevels[difficulty]?.name}
                  </Badge>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card
        className="mt-5 p-4"
        style={{
          backgroundColor: "transparent",
          border: btnTheme.border,
          backdropFilter: "blur(15px)",
          color: finalColor,
          transition: "all 0.3s ease-in",
        }}
      >
        <Card.Header>
          <h6 className="m-0">✨ Color Memory Master </h6>
        </Card.Header>

        <small className="text-center d-block">
          Watch the colors flash, then click yhem in the same order!{" "}
        </small>

        <Row className="g-3 justify-content-center mt-5">
          {cards.map((card) => (
            <Col xs={6} md={3} key={card.id}>
              <div
                className={`memory-card d-flex justify-content-center align-items-center p-4 ${
                  activeCardId === card.id ? "flash" : ""
                }`}
                style={{
                  "--flash-color": card.color,
                  height: "110px",
                  cursor:
                    isDisplaySequence || gameStatus !== "playing"
                      ? "not-allowed"
                      : "pointer",
                  border: `2px solid ${card.color}40`,
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                  backgroundColor:
                    activeCardId === card.id
                      ? card.color
                      : "rgba(255, 255, 255, 0.05)",
                }}
                onClick={() => handleCardClick(card.id)}
              >
                <span className="card-emoji" style={{ fontSize: "2.5rem" }}>
                  {card.emoji}
                </span>
              </div>
            </Col>
          ))}
        </Row>

        <div
          className="d-flex justify-content-center mt-4"
          style={{ color: finalColor }}
        >
          Level: {level} / {maxLevels} | Progress: {userSequence.length} /{" "}
          {sequence.length || 1}
        </div>

        <div className=" d-flex justify-content-center flex-column p-4">
          {gameStatus === "lost" && (
            <p className="text-center">❌ Wrong answer! Try again</p>
          )}
          {gameStatus === "won" && (
            <p className="text-center">
              🎉You have successfully completed the level!
            </p>
          )}

          {gameStatus === "idle" ||
          gameStatus === "lost" ||
          gameStatus === "won" ? (
            <Button
              style={{
                backgroundColor: "transparent",
                border: btnTheme.border,
                backdropFilter: "blur(15px)",
                color: finalColor,
                transition: "all 0.3s ease-in",
              }}
              className="control-btn start-btn rounded-3 "
              onClick={startGame}
            >
              {gameStatus === "idle" ? "Start playing 🎮" : "Try again 🔄"}
            </Button>
          ) : (
            <Button
              style={{
                backgroundColor: "transparent",
                border: btnTheme.border,
                backdropFilter: "blur(15px)",
                color: finalColor,
                transition: "all 0.3s ease-in",
              }}
              className="control-btn reset-btn rounded-3"
              onClick={resetGame}
            >
              Reset Game 🔁
            </Button>
          )}
        </div>
      </Card>

      <Row className="pb-5">
        <Col className="mt-5">
          <Card
            className="p-3"
            style={{
              backgroundColor: "transparent",
              border: btnTheme.border,
              backdropFilter: "blur(15px)",
              color: finalColor,
              transition: "all 0.3s ease-in",
            }}
          >
            <Card.Header>
              <h6 className="m-0">✨ Color Match </h6>
            </Card.Header>
            <Card.Body>
              <small>
                Click the actual color of the word, not what it says
              </small>
              <h4
                className="fw-bold mt-3"
                style={{
                  color: currentColor.value,
                }}
              >
                {currentText}
              </h4>

              <div className="d-flex gap-2 ">
                {shuffledOption.map((color, index) => (
                  <Button
                    style={{
                      backgroundColor: "transparent",
                      border: btnTheme.border,
                      backdropFilter: "blur(15px)",
                      color: finalColor,
                      transition: "all 0.3s ease-in",
                    }}
                    key={index}
                    onClick={() => handleOptionClick(color.name)}
                  >
                    {color.name}
                  </Button>
                ))}
              </div>

              <div className="mt-3">
                Score : {score} Mistakse : {mistakes}
                <Button
                  className="btn-sm ms-2"
                  style={{
                    backgroundColor: "transparent",
                    border: btnTheme.border,
                    backdropFilter: "blur(15px)",
                    color: finalColor,
                    transition: "all 0.3s ease-in",
                  }}
                  onClick={handlerestColorGame}
                >
                  Reset
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="d-flex gap-3">
        <Button
          onClick={handleLeaderboard}
          style={{
            backgroundColor: "transparent",
            border: btnTheme.border,
            backdropFilter: "blur(15px)",
            color: finalColor,
            transition: "all 0.3s ease-in",
          }}
        >
          Learderboard
        </Button>
        <Button
          onClick={() => {
            if (gameStatus === 'won') {
              handleFinish(true);
            } else {
              handleFinish(false);
            }
          }}
          style={{
            backgroundColor: "transparent",
            border: btnTheme.border,
            backdropFilter: "blur(15px)",
            color: finalColor,
            transition: "all 0.3s ease-in",
          }}
        >
          Finish & Save
        </Button>
      </div>
    </Container>
  );
}
export default Play;
