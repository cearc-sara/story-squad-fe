import React, { useState, useEffect } from 'react';
// import history from './history';
import { connect } from 'react-redux';
import { tasks } from '../../../state/actions';
// import { useHistory } from 'react-router-dom';
import Gamemode from './Gamemode';
import { Link, Route, useHistory } from 'react-router-dom';
import Gamebtn from './Gamebtn';

import { render } from 'react-dom';

const GamemodeButton = ({ ...props }) => {
  const { push, location } = useHistory();
  const [rwd, setsRwd] = useState({
    read: false,
    write: false,
    draw: false,
  });
  const [sP, setsP] = useState(true);
  //   history.push('/gamemode/single');

  // useEffect(() => {
  //   const propInit = () => {
  //     if (props.child.gamemode !== null) {
  //       props.child.gamemode = {
  //         mode: 'single',
  //         read: rwd.read,
  //         write: rwd.write,
  //         draw: rwd.draw,
  //         sp: sP,
  //       };
  //     } else {
  //       props.child.gamemode = {
  //         mode: 'select',
  //         read: false,
  //         write: false,
  //         draw: false,
  //         sp: false,
  //       };
  //     }
  //   };
  //   propInit();
  // }, [rwd, props.child]);

  useEffect(() => {
    const inofit = () => {
      if (props.child.gamemode.sp === false) {
        setsP(false);
      }
    };
    inofit();
  }, [sP, props.child]);

  const sread = e => {
    const ff = e.target.textContent;
    switch (ff) {
      case 'Read': {
        setsRwd({ read: !rwd.read, write: rwd.write, draw: rwd.draw });
        props.child.gamemode = {
          mode: 'single',
          read: !props.child.gamemode.read,
          write: rwd.write,
          draw: rwd.draw,
          sp: true,
        };

        console.log('nalread ', props.child.gamemode);
        break;
      }
      case 'Write': {
        setsRwd({ read: rwd.read, write: !rwd.write, draw: rwd.draw });
        props.child.gamemode = {
          mode: 'single',
          read: rwd.read,
          write: !props.child.gamemode.write,
          draw: rwd.draw,
          sp: true,
        };
        console.log('nalwrirte ', props.child.gamemode);

        break;
      }
      case 'Draw': {
        setsRwd({ read: rwd.read, write: rwd.write, draw: !rwd.draw });
        props.child.gamemode = {
          mode: 'single',
          read: rwd.read,
          write: rwd.write,
          draw: !props.child.gamemode.draw,
          sp: true,
        };
        console.log('naldraw ', props.child.gamemode);
        break;
      }
      default: {
        // setsRwd({ read: !rwd.read, write: !rwd.write, draw: rwd.draw });
        props.child.gamemode = {
          mode: 'single-defaulted',
          read: props.child.gamemode.read,
          write: props.child.gamemode.write,
          draw: props.child.gamemode.draw,
          sp: false,
        };
        console.log('naldefault ', props.child.gamemode);
        break;
      }
    }

    // push('/gamemode/single');
    // push('/gamemode/single');
    // console.log('zzzz ',props.child.gamemode);
  };
  const singled = r => {
    // e.preventDefault();
    rwd.read = false;
    rwd.draw = false;
    rwd.write = false;
    props.child.gamemode = {
      mode: 'select',
      read: false,
      write: false,
      draw: false,
      sp: false,
    };
    push('/gamemode');
    // push('/gamemode/single');
    console.log('nal else ', props.child);
  };
  // const forceUpdateHandler = () => {
  //   this.forceUpdate();
  // };

  //   console.log(history);

  //   console.log(history);
  return (
    <>
      <div>
        {sP && (
          <Link to="/gamemode">
            <button
              onClick={e => {
                singled();
              }}
            >
              Single Player Mode
            </button>
            {!sP && location.pathname('/gamemode/single') && (
              <Route
                path="/gamemode"
                component={
                  <Gamemode id={props.id} {...props} singled={props.singled} />
                }
              />
            )}
          </Link>
        )}

        <button
          onClick={e => {
            sread(e);
          }}
        >
          Read
        </button>
      </div>
      <div>
        <button
          onClick={e => {
            sread(e);
          }}
        >
          Write
        </button>
      </div>
      <div>
        <button
          onClick={e => {
            sread(e);
          }}
        >
          Draw
        </button>
      </div>

      {rwd.read && <h1>RREEAADD PIC SOON</h1>}
      {rwd.write && <h1>WWRIITTE PIC SOON</h1>}
      {rwd.draw && <h1>DDRRAAWW PIC SOON</h1>}
      {rwd.read || rwd.write || rwd.draw ? (
        <button>Playboss</button>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default connect(
  state => ({
    child: state.child,
  }),
  {}
)(GamemodeButton);
// export default connect()(Gamemode);
