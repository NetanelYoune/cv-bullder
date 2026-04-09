pipeline {
    agent any

    parameters {
        choice(name: 'ACTION', choices: ['build', 'test', 'deploy'], description: 'Choose action')
    }

    stages {
        stage('Run Action') {
            steps {
                script {
                    if (params.ACTION == 'build') {
                        echo 'Running build...'
                    } 
                    else if (params.ACTION == 'test') {
                        echo 'Running test...'
                    } 
                    else if (params.ACTION == 'deploy') {
                        echo 'Running deploy...'

                        publishHTML([
                            reportDir: 'client',
                            reportFiles: 'index.html',
                            reportName: 'My HTML Page'
                        ])
                    }
                }
            }
        }
    }
}