import React, { Component } from 'react'
 
import HorizontalCalendar from 'horizontal-calendar'
 
export default class App extends Component {
  render () {
    return (
      <div>
        <HorizontalCalendar
          showing={{
            years: true,
            quarters: false,
            months: true,
            days: true,
            weeks: false
          }}
          noSelect={{
            years: false,
            quarters: false,
            months: false,
            days: false,
            weeks: false
          }}
          startDate='2020-01-01'
          endDate='2020-12-31'
          selectedMode='day'
          selectedDate='2020-10-13 '/>
      </div>
    )
  }
}