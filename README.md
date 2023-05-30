# records-regulations
Housing public regulations from the http://regulations.phila-records.com/ website

The .json file values should map to column headers:

| Filing   date | Department   or agency | Proposed   regulation                                                     | Hearing   requested? |  Hearing date  | Hearing   report filed | Final   regulation | Date   became law | Supporting   document                                                        |
|---------------|------------------------|---------------------------------------------------------------------------|:--------------------:|:--------------:|------------------------|--------------------|-------------------|------------------------------------------------------------------------------|
| {filing_date} | {department}           | <a href="https://www.phila.gov/regulations/{reg_link}">{proposed_reg}</a> | {hearing_request}    | {hearing_date} | {hearing_report}       | {final_reg}        | {law}             | <a href="{support}">{support}</a> <a href="{support.1}">{support.1}</a> etc. |