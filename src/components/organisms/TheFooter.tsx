import React from 'react'
import i18n from '../../translations/i18n'
import { URLConstants } from '../../utils/AppConstants'
import '../../assets/scss/footer.scss'

const TheFooter = () => {
  return (
   <div className="footer">
      <button className="uk-button uk-button-orange uk-margin-auto btn-shadow btn-feedback">
       <a
        className="a-feedbak"
          href={URLConstants.FEEDBACK_LINK}
          target="_blank"
          rel="noopener noreferrer"
        >
          {i18n.t("LABELS.FEEDBACK")}
        </a>
    </button>
   </div>
  )
}

export default React.memo(TheFooter)
