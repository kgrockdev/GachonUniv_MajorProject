import { useEffect } from "react";
import useState from "react-usestateref";
import { useSelector } from "react-redux";

// @mui
import { Container } from "@mui/system";
import { Box, Grid, Button, Drawer, Pagination } from "@mui/material";

// @mui Icon
import CloseIcon from "@mui/icons-material/Close";

// axios
import axios from "axios";

// Components
import SelfDiagnosisModal from "components/SelfDiagnosisModal/index";
import SNSVerifyModalModal from "components/SNSVerifyModal/index";
import KoChatBot from "components/KoChatBot/index";
import ApexCharts from "pages/mainPages/Index/components/ApexCharts";
import AnalyzeDepression from "pages/mainPages/Index/components/AnalyzeDepression";

// module
import { getLocation } from "module/geoLocation";
import { createKakaoMapScript } from "module/kakaoMapScript";
import { jwtUtils } from "module/utils/jwtUtils";

function IndexPage() {
  const token = useSelector((state) => state.Auth.token);

  const [isAuth, setIsAuth] = useState(false);

  const [userName, setUserName, currentUserName] = useState("");
  const [userID, setUserID, currentUserID] = useState("");
  const [memberID, setMemberID, currentMemberID] = useState(-1);

  // 최근 검사 결과 State
  const [
    recentDiagnoseDateList,
    setRecentDiagnoseDateList,
    currentRecentDiagnoseDateList,
  ] = useState("");
  const [
    recentDiagnoseScore,
    setRecentDiagnoseScore,
    currentRecentDiagnoseScore,
  ] = useState(-1);
  const [
    recentDiagnoseScoreList,
    setRecentDiagnoseScoreList,
    currentRecentDiagnoseScoreList,
  ] = useState("");

  const [recentComment, setRecentComment, currentRecentComment] = useState("");

  const [
    diagnoseBtnDisabled,
    setDiagnoseBtnDisabled,
    currentDiagnoseBtnDisabled,
  ] = useState(true);

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setIsAuth(true);
      setUserName(jwtUtils.getUserName(token));
      setUserID(jwtUtils.getUserId(token));
      setMemberID(jwtUtils.getId(token));

      // 자가진단 7문항 하루 1회 팝업
      axios
        .post(
          `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/checkdate`,
          {
            memberId: jwtUtils.getId(token),
          }
        )
        .then(function (result) {
          var now = new Date();

          var year = now.getFullYear();
          var month = now.getMonth();
          var day = now.getDate();

          var lastDate = new Date(result.data.split("T")[0]);
          var nowDate = new Date(year, month, day);

          console.log(lastDate);
          console.log(nowDate);

          if (lastDate < nowDate) {
            showDiagnosisModal();
          } else {
            hideDiagnosisModal();
          }
        })
        .catch(function (error) {
          console.error(error);
        });

      // 진단하기 버튼 활성화 여부
      axios
        .post(
          `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/diagnose/check`,
          {
            memberId: jwtUtils.getId(token),
          }
        )
        .then(function (result) {
          console.log(result);
          setDiagnoseBtnDisabled(result.data);
        })
        .catch(function (error) {
          console.error(error);
        });

      // 최근 검사 4건 결과
      axios
        .post(
          `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/member/recent/result`,
          {
            memberId: jwtUtils.getId(token),
          }
        )
        .then(function (result) {
          console.log(result.data);

          var tempDateList = "";
          var tempScoreList = "";

          result.data.map((value) => {
            tempDateList += value.diagnoseDate.split("T")[0] + ", ";
            tempScoreList += value.result + ", ";
          });

          var datalen = result.data.length;
          for (var i = 0; i < 4 - datalen; i++) {
            tempDateList += "검사결과 없음" + ", ";
            tempScoreList += "-1" + ", ";
          }

          console.log(tempDateList);
          console.log(tempScoreList);

          setRecentDiagnoseScore(tempScoreList.split(", ")[0]);

          setRecentDiagnoseDateList(tempDateList);
          setRecentDiagnoseScoreList(tempScoreList);

          // 점수에 따른 멘트 출력
          axios
            .post(
              `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/diagnose/comment`,
              currentRecentDiagnoseScoreList.current.split(", ")[0],
              {
                headers: { "Content-Type": "text/plain" },
              }
            )
            .then(function (result) {
              console.log(result);
              setRecentComment(result.data);
            })
            .catch(function (error) {
              console.error(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setIsAuth(false);
    }
  }, [token]);

  // 근처 상담센터 Drawer 관리 State
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const hideDrawer = () => {
    setDrawerVisible(false);
  };

  const [centerData, setCenterData, centerDataRef] = useState([]);
  const [centerPage, setCenterPage, centerPageRef] = useState(-1);

  // SelfDiagnosisModal 관리 State
  const [isDiagnosisModalVisible, setDiagnosisModalVisible] = useState(false);

  const showDiagnosisModal = () => {
    setDiagnosisModalVisible(true);
  };
  const hideDiagnosisModal = () => {
    setDiagnosisModalVisible(false);
  };

  // SNSVerifyModal 관리 State
  const [isSNSVerifyModalVisible, setSNSVerifyModalVisible] = useState(false);

  const showSNSVerifyModal = () => {
    setSNSVerifyModalVisible(true);
  };
  const hideSNSVerifyModal = () => {
    setSNSVerifyModalVisible(false);
  };

  useEffect(function () {}, []);

  // 다시 진단하기
  const handleDiagnoseReqest = () => {
    setDiagnoseBtnDisabled(true);

    axios
      .post(
        `${process.env.REACT_APP_Proxy_Server}/${process.env.REACT_APP_Backend_Server}/diagnose`,
        {
          memberId: jwtUtils.getId(token),
        }
      )
      .then(function (result) {
        console.log(result);

        alert("진단이 완료되었습니다. 새로고침하여 결과를 확인해주세요.");
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          alert(error.response.data);
          showSNSVerifyModal();
        } else {
          console.error(error);
          alert("진단이 실패했습니다. 잠시 후에 다시 시도해주세요.");
        }
      });
  };

  // Pagination 관리
  const [currentPage, setCurrentPage, currentPageRef] = useState(1);

  const pageChangeHandler = (data) => {
    setCenterData(data.data);
    setCenterPage(data.page);
  };

  useEffect(
    function () {
      getLocation().then((res) => {
        createKakaoMapScript(
          res.latitude,
          res.longitude,
          currentPageRef.current
        ).then((data) => {
          pageChangeHandler(data);
        });
      });
    },
    [currentPage]
  );

  return isAuth ? (
    <Container component="main" disableGutters>
      {/* 근처 상담센터 위치 Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerVisible}
        onClose={hideDrawer}
        variant="persistent"
      >
        <Box position="absolute" top={0} right={0}>
          {/* Drawer 닫기 버튼 */}
          <Button
            color="blackColor"
            sx={{ margin: "1vh" }}
            onClick={hideDrawer}
          >
            <CloseIcon />
          </Button>
        </Box>
        <Box sx={{ margin: "3vh", marginTop: "5vh" }}>
          <Box
            id="myMap"
            sx={{
              width: "50vh",
              height: "50vh",
              borderRadius: "8px",
            }}
          ></Box>
          <Box id="list_wrap" sx={{ textAlign: "center" }}>
            <Box id="placesList">
              {centerDataRef.current.map((value) => (
                <Box
                  key={value.place_name}
                  name="tableCell"
                  sx={{
                    padding: 2,
                    borderBottom: 1,
                    borderColor: "#000000",
                  }}
                >
                  <Box
                    name="nameAndPhone"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box
                      name="place_name"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "Noto Sans KR, sansSerif",
                      }}
                    >
                      {value.place_name} ({value.distance} M)
                    </Box>
                    <Box
                      name="phone"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "Gothic A1, sansSerif",
                      }}
                    >
                      {value.phone}
                    </Box>
                  </Box>
                  <Box
                    name="address_name"
                    sx={{
                      textAlign: "left",
                      fontWeight: "bold",
                      fontFamily: "Gothic A1, sansSerif",
                    }}
                  >
                    {value.address_name}
                  </Box>
                </Box>
              ))}
            </Box>
            <Pagination
              page={currentPage}
              count={centerPageRef.current}
              variant="outlined"
              shape="rounded"
              sx={{ display: "inline-block" }}
              onChange={(event, value) => {
                setCurrentPage(value);
              }}
            />
          </Box>
        </Box>
      </Drawer>

      {/* 7가지 증상 진단 Modal */}
      <SelfDiagnosisModal
        open={isDiagnosisModalVisible}
        onClose={hideDiagnosisModal}
        userID={currentUserID.current}
      />

      {/* Verify 인증 Modal (테스트용, 삭제) */}
      <SNSVerifyModalModal
        memberId={currentMemberID.current}
        open={isSNSVerifyModalVisible}
        onClose={hideSNSVerifyModal}
      />

      {/* Start BackGround Color */}
      <Box
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundColor: "rgba( 248, 241, 232, 0.7 )",
          backgroundSize: "cover",
        }}
      ></Box>
      {/* End BackGround Color */}

      <Box
        px={1}
        width="100%"
        height="100vh"
        mx="auto"
        position="relative"
        zIndex={2}
      >
        <Grid container>
          <Grid
            item
            xs={5}
            sx={{
              border: 1,
              borderColor: "#FFD400",
              borderRadius: "8px",
              backgroundColor: "#FFD400",
            }}
          >
            <Box>
              <AnalyzeDepression
                userName={currentUserName.current}
                depressionScore={currentRecentDiagnoseScore.current}
                comment={currentRecentComment.current}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  id="nearbyCounselingCenter"
                  key="nearbyCounselingCenter"
                  name="nearbyCounselingCenter"
                  variant="contained"
                  color="whiteColor"
                  sx={{
                    fontFamily: "Do Hyeon, sansSerif",
                    fontSize: "1.0em",
                    width: "10em",
                    borderRadius: "8px",
                    marginY: 2,
                  }}
                  onClick={showDrawer}
                >
                  근처 상담센터
                </Button>
                <Button
                  id="reDiagnosis"
                  key="reDiagnosis"
                  name="reDiagnosis"
                  variant="contained"
                  color="whiteColor"
                  sx={{
                    fontFamily: "Do Hyeon, sansSerif",
                    fontSize: "1.0em",
                    width: "10em",
                    borderRadius: "8px",
                    marginY: 2,
                  }}
                  onClick={handleDiagnoseReqest}
                  disabled={currentDiagnoseBtnDisabled.current}
                >
                  다시 진단하기
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2} />
          <Grid
            item
            xs={5}
            sx={{
              border: 1,
              borderColor: "#FFD400",
              borderRadius: "8px",
              backgroundColor: "#FFD400",
            }}
          >
            <ApexCharts
              userName={currentUserName.current}
              recentDate={currentRecentDiagnoseDateList.current}
              recentData={currentRecentDiagnoseScoreList.current}
            />
          </Grid>
          <Grid item xs={12} sx={{ height: "10px" }} />
          <Grid
            item
            xs={12}
            sx={{
              border: 1,
              borderColor: "#FFD400",
              borderRadius: "8px",
              backgroundColor: "#FFD400",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <KoChatBot />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  ) : (
    <Container component="main" disableGutters>
      <Box
        sx={{
          padding: "5rem 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            opacity: "0",
            animation: "smoothAppear 1s forwards",
            animationDelay: "0.5s",
            margin: "15px 0",
            fontSize: "2rem",
            color: "pink",
          }}
        >
          BLOOM 홈페이지입니다.
        </Box>
        <Box
          sx={{
            opacity: "0",
            animation: "smoothAppear 1s forwards",
            animationDelay: "0.5s",
            margin: "15px 0",
            fontSize: "2rem",
            color: "pink",
          }}
        >
          로그인을 해주시면 서비스를 이용하실 수 있습니다.
        </Box>
      </Box>
    </Container>
  );
}

export default IndexPage;
