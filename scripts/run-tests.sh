gitlab-runner exec docker test_service_about && \
gitlab-runner exec docker test_service_database && \
gitlab-runner exec docker test_service_image_generator && \
gitlab-runner exec docker test_service_psi4 && \
gitlab-runner exec docker test_service_pyscf && \
gitlab-runner exec docker test_service_tensormol && \
gitlab-runner exec docker test_service_webapp
