#!/bin/bash

(cd services/about && npm test) && \
(cd services/database && npm test) && \
(cd services/image-generator && npm test) && \
(cd services/psi4 && npm test) && \
(cd services/pyscf && npm test) && \
(cd services/tensormol && ./scripts/test.sh) && \
(cd services/webapp && npm test)
