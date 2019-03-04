import React, {Component} from 'react';
import {connect} from 'react-redux';
import logo from '../logo.svg';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import DashboardComponent from "./DashboardComponent";
import NewExerciseComponent from "./NewExerciseComponent";
import EditExerciseComponent from "./EditExerciseComponent";
import NewWorkoutComponent from "./NewWorkoutComponent";
import EditWorkoutComponent from "./EditWorkoutComponent";

import firebase from 'firebase';
import {config} from '../Data/data';
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const NamePageArray = [
    {
        name: "Dashboard",
        src: "https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png"
    },
    {
        name: "New exercise",
        src: "https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png"
    },
    {
        name: "Edit exercises",
        src: "https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png"
    },
    {
        name: "New workout",
        src: "https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png"
    },
    {
        name: "Edit workout",
        src: "https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png"
    }];

class UsersWorkoutComponent extends Component {
    componentWillMount ( ) {
        let myThis = this;
        let ref = firebase.database().ref('/');
        ref.once('value', function(snapshot) {

            snapshot.forEach(function(childSnapshot) {
                let childData = childSnapshot.val();
                let childKey = childSnapshot.key;
                //let dataRef = snapshot.ref;
                if (+childKey === myThis.props.currentUserSignInData.id){
                    if (childData.exercises !== undefined) myThis.props.onSetExercises(childData.exercises);
                    if (childData.workouts !== undefined) {
                        myThis.props.onSetWorkouts(childData.workouts);
                        childData.workouts.forEach((element) =>  {
                            myThis.props.onAddSelectedDates(element.date);
                        });
                    }
                }
            });
        });
    };

    showIllumination = (item) => {
        if (item.name.toLowerCase() === this.props.currentNamePage.toLowerCase())return "illumination";
    };

    showHover = (item) => {
        for (let i=0; i<3; i++){
            if (NamePageArray[i].name.toLowerCase() === item.name.toLowerCase())return "hover";
        }
    };

    onclick = (item) => {
        if(item.name.toLowerCase() === NamePageArray[0].name.toLowerCase()){
            this.props.history.push("/user/"+(this.props.currentUserSignInData.email)+"/dashboard");
        }
        if(item.name.toLowerCase() === NamePageArray[1].name.toLowerCase()){
            this.props.history.push("/user/"+(this.props.currentUserSignInData.email)+"/new exercise");
        }
        if(item.name.toLowerCase() === NamePageArray[2].name.toLowerCase()){
            this.props.history.push("/user/"+(this.props.currentUserSignInData.email)+"/edit exercises");
        }
    };

    render(){
        return(
            <div className={'myPage'}>
                <div className={'SideBar'}>
                    <div className={'Header'}>
                        <img src={logo} className="App-logo" alt="logo" />
                        <div >
                            FIT TRAINER
                        </div>
                    </div>
                    <hr/>
                    {NamePageArray.map((item, index) => {
                        return (
                            <div className={"myButton "+ this.showIllumination(item)+" "+this.showHover(item)}
                                 key = {index}
                                 onClick = {() => this.onclick(item)}
                            >
                                <div>
                                    <img src={item.src} alt={""}/>{item.name}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={"Component"}>
                    <Switch>
                        <Route path="/user/:user/dashboard" component = {DashboardComponent} />
                        <Route path="/user/:user/new exercise" component = {NewExerciseComponent} />
                        <Route path="/user/:user/edit exercises" component = {EditExerciseComponent} />
                        <Route path="/user/:user/:new_date/new workout" component = {NewWorkoutComponent} />
                        <Route path="/user/:user/:date/edit workout" component = {EditWorkoutComponent} />
                        <Redirect from = "/user" to="/user/:user/dashboard"/>
                    </Switch>
                </div>
            </div>
        );
    }
};


export default withRouter(connect(
    (state) => ({
        currentUserSignInData: state.currentUserSignInData,
        currentNamePage: state.currentNamePage
    }),

    dispatch => ({
        onSetExercises:(data) => {
            const payload = data;
            dispatch({type: 'SET_EXERCISES', payload})
        },
        onSetWorkouts:(data) => {
            const payload = data;
            dispatch({type: 'SET_WORKOUTS', payload})
        },
        onAddSelectedDates: (data) => {
            const payload = data;
            dispatch ({type: 'ADD_SELECTED_DATES', payload})
        },
    })
)(UsersWorkoutComponent));