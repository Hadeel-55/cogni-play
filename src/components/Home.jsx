import { Container, Row, Col, Button, InputGroup, Form } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { PlayerContext } from "../context/PlayerContext";
import { MemoryMasterContext } from "../context/MemoryMasterContext";

function Home() {
  const { NextImage, prevImage, finalColor, finalBlurCard, btnTheme, isDark } =
    useContext(ThemeContext);
  const {
    profileTemporary,
    setProfileTemporary,
    profileSaved,
    setProfileSaved,
    handleSaveProfile,
  } = useContext(PlayerContext);
  const { difficutyLevels, setDifficulty, gameStatus, difficulty } =
    useContext(MemoryMasterContext);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center gap-3">
        <Col xs={10} md={5}>
          <div
            className="card"
            style={{
              backgroundColor: "transparent",
              border: btnTheme.border,
              backdropFilter: "blur(15px)",
              color: finalColor,
              transition: "all 0.3s ease-in",
            }}
          >
            <div className="card-header">
              <h4>Welcome</h4>
            </div>
            <div className="card-body p-3 pb-0 rounded-0">
              <h6 className="fw-bold">Hello,{profileTemporary.name}! 🖐️</h6>
              <small>
                Difficulty:{" "}
                {difficutyLevels[difficulty].name.charAt(0).toUpperCase() +
                  difficutyLevels[difficulty].name.slice(1)}{" "}
                Foucs Goal {profileTemporary.focusGoal} mine
              </small>
              <small style={{ fontWeight: "600" }}>
                Stay sharp keep practicing.- Unknown{" "}
              </small>
              <div className="d-flex gap-2 p-3">
                <Button
                  className="btn-sm fw-semibold"
                  style={{
                    ...btnTheme,
                    color: finalColor,
                    transition: "all 0.3s ease-in",
                  }}
                  onClick={prevImage}
                >
                  ← Background
                </Button>
                <Button
                  className="btn-sm fw-semibold"
                  style={{
                    ...btnTheme,
                    color: finalColor,
                    transition: "all 0.3s ease-in",
                  }}
                  onClick={NextImage}
                >
                  Background →
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={10} md={5}>
          <div
            className="card"
            style={{
              backgroundColor: "transparent",
              border: btnTheme.border,
              backdropFilter: "blur(15px)",
              color: finalColor,
              transition: "all 0.3s ease-in",
            }}
          >
            <div className="card-header">
              <h4>Profile & Setings</h4>
            </div>

            <div className="card-body p-3 pb-0 rounded-0">
              <div className="p-3">
                <div className="d-flex gap-3">
                  <Form.Group className="mb-3" controlId="userName">
                    <Form.Label className="fw-semibold">Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={profileTemporary.name}
                      onChange={(e) =>
                        setProfileTemporary({
                          ...profileTemporary,
                          name: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="difficultyLevel">
                    <Form.Label className="fw-semibold">
                      Difficulty Level
                    </Form.Label>
                    <Form.Select
                      value={difficulty}
                      onChange={(e) => {
                        setDifficulty(e.target.value);
                      }}
                      disabled={gameStatus === "playing"}
                    >
                      {Object.keys(difficutyLevels).map((key) => (
                        <option key={key} value={key}>
                          {difficutyLevels[key].name.charAt(0).toUpperCase() +
                            difficutyLevels[key].name.slice(1)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Daily Focus Goal
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      placeholder="10"
                      aria-label="Focus Goal"
                      value={profileTemporary.focusGoal}
                      onChange={(e) =>
                        setProfileTemporary({
                          ...profileTemporary,
                          focusGoal: e.target.value,
                        })
                      }
                    />
                    <InputGroup.Text>mins</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </div>
              <div className=" p-3 pt-0">
                <Button
                  type="submit"
                  onClick={handleSaveProfile}
                  className="btn-sm fw-semibold"
                  style={{
                    ...btnTheme,
                    color: finalColor,
                    transition: "all 0.3s ease-in",
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Home;
