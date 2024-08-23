import { styled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

const LegendContainer = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const GradientBar = styled('div')`
  width: 300px;
  height: 20px;
  background-image: linear-gradient(
    to right,
    rgba(0, 228, 0, 1),
    rgba(255, 255, 0, 1),
    rgba(255, 126, 0, 1),
    rgba(255, 0, 0, 1),
    rgba(143, 63, 151, 1),
    rgba(126, 0, 35, 1)
  );
  border: 2px solid;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const ScaleValue = styled(Typography)`
  font-size: 14px;
  font-weight: bold;
  font-family: Arial, sans-serif;
  color: #fff;
`;

const Legend = () => {
  return (
    <LegendContainer container spacing={2}>
      <GradientBar>
        <ScaleValue>0</ScaleValue>
        <ScaleValue>50</ScaleValue>
        <ScaleValue>100</ScaleValue>
        <ScaleValue>150</ScaleValue>
        <ScaleValue>200</ScaleValue>
        <ScaleValue>300</ScaleValue>
        <ScaleValue> &gt; 300</ScaleValue>
      </GradientBar>
    </LegendContainer>
  );
};

export default Legend;