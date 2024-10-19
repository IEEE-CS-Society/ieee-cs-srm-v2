import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px;
  background-color: #000;
  color: #fff;
`;

const WorkSection = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 600;
`;

const Description = styled.p`
  margin: 20px 0;
  line-height: 1.5;
`;

const ShowMoreButton = styled.button`
  background-color: transparent;
  color: #ffb800;
  border: 1px solid #ffb800;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #ffb800;
    color: #000;
  }
`;

const GridContainer = styled.div`
  flex: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const WorkCard = styled.div`
  background-color: #222;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ImagePlaceholder = styled.div`
  height: 120px;
  background-color: #9573c4;
  border-radius: 8px;
`;

const Tag = styled.span`
  background-color: #ffb800;
  color: #000;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 4px;
  align-self: flex-start;
`;

const WorkTitle = styled.h3`
  font-size: 20px;
  margin: 0;
`;

const ReadMore = styled.a`
  margin-top: auto;
  color: #aaa;
  text-decoration: none;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  transition: 0.3s;

  &:hover {
    color: #fff;
  }

  &::after {
    content: "\2192";
    margin-left: 8px;
    transition: margin-left 0.3s;
  }

  &:hover::after {
    margin-left: 12px;
  }
`;

const data = [
    { tag: "Website", title: "Creative landing page" },
    { tag: "Digital Marketing", title: "Why We Collect User's Data" },
    { tag: "Branding", title: "Creative Branding" },
    { tag: "User Testing", title: "Creative landing page" },
    { tag: "Development", title: "Automation. Advanced Level" },
    { tag: "SEO", title: "How We Optimized Our SEO" },
];

const App = () => {
    return (
        <Container>
            <WorkSection>
                <Title>Some pieces of our work</Title>
                <Description>
                    Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta
                    feugiat scelerisque in elit. Morbi rhoncus, tellus, eros consequat
                    magna semper orci a tincidunt.
                </Description>
                <ShowMoreButton>Show More</ShowMoreButton>
            </WorkSection>
            <GridContainer>
                {data.map((item, index) => (
                    <WorkCard key={index}>
                        <ImagePlaceholder />
                        <Tag>{item.tag}</Tag>
                        <WorkTitle>{item.title}</WorkTitle>
                        <ReadMore href="#">Read more</ReadMore>
                    </WorkCard>
                ))}
            </GridContainer>
        </Container>
    );
};

export default App;