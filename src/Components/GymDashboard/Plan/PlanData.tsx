import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const PlanData = (props) => {
  return (
    <div>
      {props.planDataProps.map((plan) => (
        <Card key={plan.id} sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {plan.planName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {plan.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {plan.monthPlan}
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

export default PlanData;
