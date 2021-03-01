import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPref, changeTheme } from './helper/slices/prefrenciasSlice';

class Dashboard extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPref());
  }

  cambiarTema = (e) => {
    e.preventDefault();
    const { tema, dispatch } = this.props;
    let newTheme;
    if (tema === 'Oscuro') {
      newTheme = 'Claro';
    } else {
      newTheme = 'Oscuro';
    }
    return dispatch(changeTheme(newTheme))
  }

  render() {
    const { nombre, tema } = this.props;
    return (
      <main>
        {`Nombre: ${nombre}, Tema: ${tema}`}
        <div>
          <button onClick={this.cambiarTema} >Cambaiar Tema</button>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => state.getPref;
export default connect(mapStateToProps)(Dashboard);
