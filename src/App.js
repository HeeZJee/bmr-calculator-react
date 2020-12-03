import React, { Component } from 'react'
import './style.css'

export class App extends Component {

  state = {
    gender: '',
    weight: 0,
    age: 0,
    heightInches: 0,
    heightFeets: 0,
    activity: '',
    bmr: 0,
    error: false,
  }

  handleChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    if (name === "gender") {
      this.setState({ gender: value })
    }
    if (name === "weight") {
      this.setState({ weight: parseInt(value) })
    }
    if (name === "age") {
      this.setState({ age: parseInt(value) })
    }
    if (name === "heightInches") {
      this.setState({ heightInches: parseInt(value) })
    }
    if (name === "heightFeets") {
      this.setState({ heightFeets: parseInt(value) })
    }
    if (name === "activity") {
      this.setState({ activity: value })
    }
  }

  calculateBMR = () => {

    const { gender, weight, age, heightInches, heightFeets, activity } = this.state
    if (!gender || !weight || !age || !heightInches || !heightFeets) {
      this.setState({ error: true })
      return;
    }
    const height = (heightFeets * 30.48) + (heightInches * 2.54)
    const bmrMale = 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age)
    console.log(bmrMale)
    const bmrFemale = 655.1 + (4.32 * weight) + (4.7 * height) - (4.7 * age)
    console.log(bmrFemale)
    const bmr = gender === '1' ? bmrFemale : gender === '2' ? bmrMale : null
    this.setState({ bmr })
    this.setState({ error: false })
    console.log(bmrMale)
  }

  render() {
    const { gender, weight, age, heightInches, heightFeets, activity, error, bmr } = this.state



    return (
      <div id="bmrcalc">
        <div className="form">
          <h2>BMR &amp; Daily Calorie Calculator</h2>
          <div className="inputwrap">
            <label className="label">Gender</label>
            <div>
              <label><input checked={gender === '1'} onChange={this.handleChange} type="radio" className="genderF" name="gender" value="1" />Female</label>
              <label><input checked={gender === '2'} onChange={this.handleChange} type="radio" className="genderM" name="gender" value="2" />Male</label>
            </div>
          </div>
          <div className="inputwrap">
            <label className="label">Weight in Pounds</label>
            <input value={weight} onChange={this.handleChange} type="number" name="weight" className="weight" min="0" max="999" />
          </div>
          <div className="inputwrap">
            <label className="label">Height in feet and inches</label>
            <input value={heightFeets} onChange={this.handleChange} type="number" name="heightFeets" className="heightFeets" min="0" max="8" />
            <input value={heightInches} onChange={this.handleChange} type="number" name="heightInches" className="heightInches" min="0" max="11" />
          </div>
          <div className="inputwrap">
            <label className="label">Age in years</label>
            <input value={age} onChange={this.handleChange} type="number" className="age" name="age" min="0" max="120" />
          </div>
          {error && <div className='error'>All Fields are required</div>}
          <button type="button" onClick={this.calculateBMR}>Calculate BMR</button>
          {bmr !== 0 && <div className="result">{bmr.toFixed(2)}</div>}
          <div className="workout">
            <div className="inputwrap">
              <label className="label">Workout in a Week</label>
              <select className="activity" value={activity} onChange={this.handleChange} name="activity">
                <option value="">Select your Activity</option>
                <option value="1.2">Sedentary (Very little or no exercise, and desk job)</option>
                <option value="1.375">Lightly Active (Light exercise 1 to 3 days per week)</option>
                <option value="1.55">Moderately Active (Moderate exercise 3 to 5 days per week)</option>
                <option value="1.725">Very Active (Heavy exercise 6 to 7 days per week)</option>
                <option value="1.9">Extremely Active (Very intense exercise, and physical job, exercise multiple times per day)</option>
              </select>
            </div>
            <button type="button">Calculate Calories</button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
