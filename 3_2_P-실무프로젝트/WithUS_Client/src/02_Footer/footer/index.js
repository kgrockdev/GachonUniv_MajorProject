import { Layout } from "antd";

function IndexPage() {
  const { Footer } = Layout;

  return (
    <Layout>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#012758",
          color: "white",
          height: "200px",
          bottom: "0",
        }}
      >
        WithUS ©2021 Created by WithYOU
      </Footer>
    </Layout>
  );
}

export default IndexPage;
