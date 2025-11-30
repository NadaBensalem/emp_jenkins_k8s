pipeline {
    agent any

    tools {
        maven 'maven384'
    }

    environment {
        // Variables pour les images Docker
        DOCKERHUB_USER = "nadabensalem"
        backendimage = "${DOCKERHUB_USER}/img-emp-backend"
        frontendimage = "${DOCKERHUB_USER}/img-emp-frontend"     
        
        // Tags d'images
        BACKEND_TAG = "latest"
        FRONTEND_TAG = "latest"
        
        // Dossiers sources
        backendF = "emp_backend"
        frontendF = "emp_frontend"

        GIT_REPO = "https://github.com/NadaBensalem/emp_jenkins_k8s.git"
        
        // Variables pour Minikube
        K8S_NAMESPACE = "emp"
    }

    stages {
        stage('Build Docker Image - Backend') {
            steps {
                echo "==> Build de l'image Docker backend"
                 bat """
                     docker build -t ${backendimage}:${BACKEND_TAG} ${backendF}
                 """
            }
        }

        stage('Push Docker Image - Backend') {
            steps {
                echo "==> Push de l'image sur Docker Hub (tag: BACKEND_TAG)"
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-cred',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )]) {
                        bat """
                            echo %DOCKERHUB_PASS% | docker login -u %DOCKERHUB_USER% --password-stdin
                            docker push ${backendimage}:${BACKEND_TAG}
                            docker logout
                        """
                    }
                }
            }
        }

        stage('Build Docker Image - Frontend') {
            steps {
                echo "==> Build de l'image Docker frontend"
                bat """
                    docker build -t ${frontendimage}:${FRONTEND_TAG} ${frontendF}
                """
            }
        }

        stage('Push Docker Image - Frontend') {
            steps {
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-cred',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )]) {
                        bat """
                            echo %DOCKERHUB_PASS% | docker login -u %DOCKERHUB_USER% --password-stdin
                            docker push ${frontendimage}:${FRONTEND_TAG}
                            docker logout
                        """
                    }
                }
            }
        }
        stage('Deploy to Minikube') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'minikube-kubeconfig', variable: 'KUBECONFIG_FILE')]) {
                        bat """
                            copy "%KUBECONFIG_FILE%" kubeconfig
                            set KUBECONFIG=.\\kubeconfig

                            REM Déployer le backend
                            kubectl apply -f manifests\\manifestback\\spring-deploy.yaml -n %K8S_NAMESPACE%

                            REM Attendre 30 secondes
                            timeout /t 30

                            REM Déployer le frontend
                            kubectl apply -f manifests\\manifestfront\\angular-deploy.yaml -n %K8S_NAMESPACE%

                            REM Vérification finale
                            echo === Pods ===
                            kubectl get pods -n %K8S_NAMESPACE%
                            echo === Services ===
                            kubectl get services -n %K8S_NAMESPACE%
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline terminé."
            // Nettoyage du kubeconfig temporaire
            bat 'del /F /Q kubeconfig'
    }
}
}