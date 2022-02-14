export let urlGQL
export let urlGQLws
export let urlMain
export let urlSubscribe
export let applicationKey
export let urlGQLSSR
if(process.env.URL==='salyk.store') {
    urlGQLSSR = `http://localhost:4444/graphql`
    urlGQL = `https://${process.env.URL}:3000/graphql`
    urlGQLws = `wss://${process.env.URL}:3000/graphql`
    urlSubscribe = `https://${process.env.URL}:3000/subscribe`
    urlMain = `https://${process.env.URL}`
    applicationKey = 'BJ1b5m45C1SyLrP3UJ4FXOIXBt8r965KUBct_ioABMGNhgqbQupYpo2n5xhYkwK8tfK6B7JCLLbyzo_IiX0RfgI'
}
else {
    urlGQLSSR = `http://localhost:3000/graphql`
    urlGQL = `http://${process.env.URL}:3000/graphql`
    urlGQLws = `ws://${process.env.URL}:3000/graphql`
    urlMain = `http://${process.env.URL}`
    urlSubscribe = `http://${process.env.URL}:3000/subscribe`
    applicationKey = 'BLPqo5HQhVWD0FbVqJNC7qiQ0JwigC9hIRXFmbY1K0eXCROhYDZY1uqtN4ZKxZ8ZEbFeBffa8k2Bj64aBtRb9Ew'
}

export const validMail = (mail) =>
{
    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(mail);
}
export const validPhone = (phone) =>
{
    return /^[+]{1}996[0-9]{9}$/.test(phone);
}
export const checkInt = (int) => {
    return isNaN(parseInt(int))?0:parseInt(int)
}
