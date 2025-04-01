import React from "react";

class Toto extends React.Component {

  render() {
    return (
      <div className="toto">
        Hello Toto !
      </div>
    );
  }
}

const App = () => (<Toto />);

export default App;