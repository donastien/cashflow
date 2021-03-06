import React from 'react';
import { Link } from 'react-router-dom';
import dashboard from '../../img/dashboard.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';

const Landing = () => {
  AOS.init();
  AOS.refresh();
  return (
    <section className='container'>
      <div className='row mt-5'>
        <div
          className='display-4 fontRoboto col-sm-12 text-center'
          data-aos='zoom-in'
        >
          Une application qui comprend <br />
          et facilite la gestion de votre <br /> trésorerie.
          <br />
          <Link className='btn btn-info fontMontserrat' to='/register'>
            Commencer dès maintenant
          </Link>
          <Link
            className='btn btn-outline-info fontMontserrat ml-4'
            to='/login'
          >
            Login
          </Link>
          <Link className='btn btn-dark fontMontserrat ml-4' to='/demo'>
            Demo
          </Link>
          <img
            src={dashboard}
            className='card shadow w-100 mt-3 mx-auto d-block'
            alt='dashboard'
          />
        </div>
      </div>
      <div className='row mt-4'>
        <div
          className='col text-center fontMontserrat mt-4 h3 '
          data-aos='fade-up'
        >
          Pourquoi utiliser CashFlow ? <br />
          <h4 className='fontRoboto mt-2'>
            CashFlow va vous permettre de gérer votre argent vous-même, pas de
            dépenses automatiser ni de connexion à votre banque. Le but : avoir
            un œil instantanément sur votre solde, éviter les 2 ou 3 jours
            d'attente avant qu'une dépense apparaisse sur votre compte ou la
            date des dépenses mensuels, ajouter-les vous-même. Ici, tout est
            calculé au début du mois et il vous reste dans votre Solde tout ce
            que vous pouvez dépenser, économiser sans craindre de pas pouvoir
            payer une dépense mensuelle ou de finir le mois à découvert.
          </h4>
          <h1 className='fontRoboto mt-5'>Soyez pro-actif.</h1>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Landing;
