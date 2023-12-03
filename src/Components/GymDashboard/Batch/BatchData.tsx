import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

const BatchData = (props) => {
  return (
    <div>
      {props.batchDataProps.map((batch) => (
        <Card key={batch.id} sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {batch.batchName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {batch.batchLimit}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {batch.batchOpenTime}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {batch.batchCloseTime}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" >
              Delete
            </Button>
            <Button size="small" >
              Edit
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default BatchData