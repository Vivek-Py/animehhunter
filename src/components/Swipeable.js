import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function SwipeableTemporaryDrawer(props) {
  function changeGenre(type) {
    if (type === "Martial Arts") {
      setStatus("17");
    } else if (type === "Demon") {
      setStatus("6");
    } else if (type === "Romance") {
      setStatus("22");
    } else if (type === "Sci-Fi") {
      setStatus("24");
    } else if (type === "Game") {
      setStatus("11");
    } else if (type === "Thriller") {
      setStatus("41");
    } else if (type === "Space") {
      setStatus("29");
    } else if (type === "Shounen") {
      setStatus("27");
    } else if (type === "Supernatural") {
      setStatus("37");
    }
  }
  const { setStatus } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ backgroundColor: "#373b69", height: "100%" }}
    >
      <List>
        {[
          "Martial Arts",
          "Demon",
          "Romance",
          "Sci-Fi",
          "Game",
          "Thriller",
          "Supernatural",
          "Shounen",
          "Space",
        ].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => {
              changeGenre(text);
            }}
            style={{ color: "white" }}
          >
            <ListItemIcon>
              {<AddIcon style={{ color: "white" }} />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon style={{ color: "white" }} />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
