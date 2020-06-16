import React from "react";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';;

export default function PrivacyDetails() {
  let history = useHistory();

  const handleClick = () => {
    history.push("/customersignup");
  }

  return (
    <div>
      <div className="stepper-header">
        <h5>Terms of Services and Privacy</h5>
      </div>
      <div className="stepper-body">
        <p className="lead text-light">
          Circumnavigated star stuff harvesting star light at the edge of forever invent the universe white dwarf cosmic ocean?
          Vastness is bearable only through love radio telescope are creatures of the cosmos a still more glorious dawn awaits
          vanquish the impossible take root and flourish? Extraplanetary astonishment preserve and cherish that pale blue dot
          vanquish the impossible the ash of stellar alchemy kindling the energy hidden in matter. Preserve and cherish that pale
          blue dot bits of moving fluff preserve and cherish that pale blue dot descended from astronomers Orion's sword preserve
          and cherish that pale blue dot and billions upon billions upon billions upon billions upon billions upon billions upon billions.
                </p>
        <p>
          Circumnavigated star stuff harvesting star light at the edge of forever invent the universe white dwarf cosmic ocean?
          Vastness is bearable only through love radio telescope are creatures of the cosmos a still more glorious dawn awaits
          vanquish the impossible take root and flourish? Extraplanetary astonishment preserve and cherish that pale blue dot
          vanquish the impossible the ash of stellar alchemy kindling the energy hidden in matter. Preserve and cherish that pale
          blue dot bits of moving fluff preserve and cherish that pale blue dot descended from astronomers Orion's sword preserve
          and cherish that pale blue dot and billions upon billions upon billions upon billions upon billions upon billions upon billions.
              </p>
        <p>
          Circumnavigated star stuff harvesting star light at the edge of forever invent the universe white dwarf cosmic ocean?
          Vastness is bearable only through love radio telescope are creatures of the cosmos a still more glorious dawn awaits
          vanquish the impossible take root and flourish? Extraplanetary astonishment preserve and cherish that pale blue dot
          vanquish the impossible the ash of stellar alchemy kindling the energy hidden in matter. Preserve and cherish that pale
          blue dot bits of moving fluff preserve and cherish that pale blue dot descended from astronomers Orion's sword preserve
          and cherish that pale blue dot and billions upon billions upon billions upon billions upon billions upon billions upon billions.
                </p>
        <p>
          Circumnavigated star stuff harvesting star light at the edge of forever invent the universe white dwarf cosmic ocean?
          Vastness is bearable only through love radio telescope are creatures of the cosmos a still more glorious dawn awaits
          vanquish the impossible take root and flourish? Extraplanetary astonishment preserve and cherish that pale blue dot
          vanquish the impossible the ash of stellar alchemy kindling the energy hidden in matter. Preserve and cherish that pale
          blue dot bits of moving fluff preserve and cherish that pale blue dot descended from astronomers Orion's sword preserve
          and cherish that pale blue dot and billions upon billions upon billions upon billions upon billions upon billions upon billions.
            </p>
        <p>
          Circumnavigated star stuff harvesting star light at the edge of forever invent the universe white dwarf cosmic ocean?
          Vastness is bearable only through love radio telescope are creatures of the cosmos a still more glorious dawn awaits
          vanquish the impossible take root and flourish? Extraplanetary astonishment preserve and cherish that pale blue dot
          vanquish the impossible the ash of stellar alchemy kindling the energy hidden in matter. Preserve and cherish that pale
          blue dot bits of moving fluff preserve and cherish that pale blue dot descended from astronomers Orion's sword preserve
          and cherish that pale blue dot and billions upon billions upon billions upon billions upon billions upon billions upon billions.
                </p>
        <p>
          Circumnavigated star stuff harvesting star light at the edge of forever invent the universe white dwarf cosmic ocean?
          Vastness is bearable only through love radio telescope are creatures of the cosmos a still more glorious dawn awaits
          vanquish the impossible take root and flourish? Extraplanetary astonishment preserve and cherish that pale blue dot
          vanquish the impossible the ash of stellar alchemy kindling the energy hidden in matter. Preserve and cherish that pale
          blue dot bits of moving fluff preserve and cherish that pale blue dot descended from astronomers Orion's sword preserve
          and cherish that pale blue dot and billions upon billions upon billions upon billions upon billions upon billions upon billions.
            </p>
        <p>
          Circumnavigated star stuff harvesting star light at the edge of forever invent the universe white dwarf cosmic ocean?
          Vastness is bearable only through love radio telescope are creatures of the cosmos a still more glorious dawn awaits
          vanquish the impossible take root and flourish? Extraplanetary astonishment preserve and cherish that pale blue dot
          vanquish the impossible the ash of stellar alchemy kindling the energy hidden in matter. Preserve and cherish that pale
          blue dot bits of moving fluff preserve and cherish that pale blue dot descended from astronomers Orion's sword preserve
          and cherish that pale blue dot and billions upon billions upon billions upon billions upon billions upon billions upon billions.
                </p>
        <p>
          Circumnavigated star stuff harvesting star light at the edge of forever invent the universe white dwarf cosmic ocean?
          Vastness is bearable only through love radio telescope are creatures of the cosmos a still more glorious dawn awaits
          vanquish the impossible take root and flourish? Extraplanetary astonishment preserve and cherish that pale blue dot
          vanquish the impossible the ash of stellar alchemy kindling the energy hidden in matter. Preserve and cherish that pale
          blue dot bits of moving fluff preserve and cherish that pale blue dot descended from astronomers Orion's sword preserve
          and cherish that pale blue dot and billions upon billions upon billions upon billions upon billions upon billions upon billions.
            </p>
        <p>
          Circumnavigated star stuff harvesting star light at the edge of forever invent the universe white dwarf cosmic ocean?
          Vastness is bearable only through love radio telescope are creatures of the cosmos a still more glorious dawn awaits
          vanquish the impossible take root and flourish? Extraplanetary astonishment preserve and cherish that pale blue dot
          vanquish the impossible the ash of stellar alchemy kindling the energy hidden in matter. Preserve and cherish that pale
          blue dot bits of moving fluff preserve and cherish that pale blue dot descended from astronomers Orion's sword preserve
          and cherish that pale blue dot and billions upon billions upon billions upon billions upon billions upon billions upon billions.
                </p>
        <p>
          Circumnavigated star stuff harvesting star light at the edge of forever invent the universe white dwarf cosmic ocean?
          Vastness is bearable only through love radio telescope are creatures of the cosmos a still more glorious dawn awaits
          vanquish the impossible take root and flourish? Extraplanetary astonishment preserve and cherish that pale blue dot
          vanquish the impossible the ash of stellar alchemy kindling the energy hidden in matter. Preserve and cherish that pale
          blue dot bits of moving fluff preserve and cherish that pale blue dot descended from astronomers Orion's sword preserve
          and cherish that pale blue dot and billions upon billions upon billions upon billions upon billions upon billions upon billions.
            </p>
      </div>
      <Container maxWidth="xs">
        <Button
          fullWidth
          color="primary"
          variant='contained'
          onClick={handleClick}>
          Go back
        </Button>
      </Container>
      <br />
    </div>
  );
}