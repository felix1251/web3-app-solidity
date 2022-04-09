import "../styles/card.scss";
import CardMenu from "./CardMenu";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  media: {
    height: 300,
    width: "100%",
    backgroundColor: "#696969",
    [theme.breakpoints.down(600)]: {
      height: 350,
    }
  },
  comment: {
    padding: "0px 15px"
  },
  profile: {
    backgroundColor: "#696969"
  },
  text: {
    backgroundColor: "#696969"
  }
}),
);

function Card() {
  const classes = useStyles();
  return (
    <div className="card">
      <header>
        <Skeleton animation="wave" variant="circle" width={40} height={40} className={classes.profile}/>
        <Skeleton animation="wave" height={28} width={"77%"} className={classes.text}/>
        <Skeleton animation="wave" height={28} width={"8%"} className={classes.text}/>
      </header>
      <Skeleton animation="wave" variant="rect" className={classes.media} />
      <CardMenu />
      <div className={classes.comment}>
        <Skeleton animation="wave" height={25} width={"50%"} style={{ marginBottom: 10 }}  className={classes.text}/>
        <Skeleton animation="wave" height={20} width={"75%"} style={{ marginBottom: 6 }}  className={classes.text}/>
        <Skeleton animation="wave" height={20} width={"55%"} style={{ marginBottom: 6 }}  className={classes.text}/>
        <Skeleton animation="wave" height={20} width={"70%"} style={{ marginBottom: 10 }}  className={classes.text}/>
        <Skeleton animation="wave" height={20} width={"20%"} style={{ marginBottom: 10 }}  className={classes.text}/>
        <Skeleton animation="wave" height={20} width={"50%"} style={{ marginBottom: 10 }}  className={classes.text}/>
      </div>
    </div>
  );
}

export default Card;
