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

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    bat 'npm install --include=dev'
                }
            }
        }

        stage('Build React') {
    steps {
        dir('frontend') {
            bat 'npm install'
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
