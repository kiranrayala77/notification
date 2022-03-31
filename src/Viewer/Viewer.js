import React, { memo } from 'react'

import * as Survey from 'survey-react'
import * as widgets from 'surveyjs-widgets'


import 'survey-react/survey.css'
import './Viewer.css'

const $ = window.$


widgets.prettycheckbox(Survey)
widgets.select2(Survey, $)
widgets.inputmask(Survey)
widgets.jquerybarrating(Survey, $)
widgets.jqueryuidatepicker(Survey, $)
widgets.nouislider(Survey)
widgets.select2tagbox(Survey, $)
widgets.sortablejs(Survey)
widgets.ckeditor(Survey)
widgets.autocomplete(Survey, $)
widgets.bootstrapslider(Survey)

function Viewer({ data, responseData, ...props }) {
   const model = new Survey.Model(data)

   if (responseData) {
      let jsonResData = JSON.parse(`${responseData}`)
      model.data = jsonResData
   }

   return <Survey.Survey model={model} {...props} />
}

export default Viewer
