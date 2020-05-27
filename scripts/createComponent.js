const readline = require('readline')
const camelCase = require('lodash.camelcase')
const fs = require('fs')
const path = require('path')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('What is the name of the new component? ', (componentName) => {
  const componentNameCamel = camelCase(componentName)
  const componentNameUpperCamel =
    componentNameCamel[0].toUpperCase() + componentNameCamel.substring(1)

  rl.write('Creating directory for component...\r\n')
  const componentDirectoryPath = path.join(
    __dirname,
    '..',
    'src',
    'components',
    componentNameUpperCamel
  )

  // Snippets.
  const codeSnippet = path.join(__dirname, '..', 'snippets', 'code.txt')
  const styleSnippet = path.join(__dirname, '..', 'snippets', 'style.txt')
  const testSnippet = path.join(__dirname, '..', 'snippets', 'test.txt')

  // Files.
  const codeFile = path.join(
    componentDirectoryPath,
    `${componentNameUpperCamel}.jsx`
  )
  const styleFile = path.join(
    componentDirectoryPath,
    `${componentNameUpperCamel}.scss`
  )
  const testFile = path.join(
    componentDirectoryPath,
    `${componentNameUpperCamel}.spec.jsx`
  )

  const snippetToFileMapping = {
    [codeSnippet]: codeFile,
    [styleSnippet]: styleFile,
    [testSnippet]: testFile
  }

  fs.promises
    .mkdir(componentDirectoryPath, { recursive: true })
    .then(() => {
      rl.write(
        `Successfully created directory for component: ${componentDirectoryPath}\r\n`
      )
      rl.write('Creating files for component...\r\n')

      Object.keys(snippetToFileMapping).forEach((snippetPath) => {
        fs.readFile(snippetPath, 'utf-8', (err, data) => {
          // Replace any snippet placeholders with meaningful values.
          data = data.replace(/\${componentName}/gi, componentName)
          data = data.replace(/\${componentNameCamel}/gi, componentNameCamel)
          data = data.replace(
            /\${componentNameUpperCamel}/gi,
            componentNameUpperCamel
          )

          fs.promises
            .writeFile(snippetToFileMapping[snippetPath], data, 'utf-8')
            .then(() => {
              rl.write(
                `Successfully created: ${snippetToFileMapping[snippetPath]}\r\n`
              )
            })
            .catch(() => {
              rl.write(
                `Failed to create: ${snippetToFileMapping[snippetPath]}\r\n`
              )
              rl.close()
            })
        })
      })
    })
    .catch(() => {
      rl.write(`Failed to create directory: ${componentDirectoryPath}\r\n`)
      rl.close()
    })
})
