pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Clone') {
            steps {
                echo 'Cloning project from GitHub...'
                checkout scm
            }
        }

        stage('Install Server Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Client Dependencies') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Test Server') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Build React') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Starting MERN application...'

                dir('backend') {
                    bat 'start /B npm start'
                }
            }
        }
    }

    post {
        success {
            echo 'MERN Pipeline completed successfully!'
        }

        failure {
            echo 'MERN Pipeline failed!'
        }
    }
}
