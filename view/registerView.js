function registerView() {
    return `<html>
                <body>
                    <form method='POST' action='/register'>
                        <input type='text' name='username' placeholder='name' />
                        <input type='text' name='password' placeholder='password'/>
                        <button type='submit'>envoyer</button>
                    </form>
                </body>
            </html>`
}

module.exports = registerView;