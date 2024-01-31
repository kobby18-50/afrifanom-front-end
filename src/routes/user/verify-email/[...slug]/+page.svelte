<script>
    import { page } from "$app/stores";
	import { Button } from "flowbite-svelte";

    import toast, {Toaster} from "svelte-french-toast";

    import axios from 'axios'
	import { BASE_URL } from "$lib";
	import { goto } from "$app/navigation";

    console.log($page.url.searchParams.get('token'))
    console.log($page.url.searchParams.get('email'))

    const query = $page.url.searchParams

    const verificationToken = query.get('token')
    const email = query.get('email')


    const handleVerifyToken = async () => {
        const data = {
            verificationToken,
            email
        }
        await axios.post(`${BASE_URL}/auth/verify-email`, data )
        .then(res => {
            toast.success('verified')
            goto('/')
            console.log(res)
        })
        .catch(err => {
            toast.error('failed')
            console.log(err)
        })
    }
</script>

<Toaster/>
<section class="mt-10 ml-20">
    <Button on:click={handleVerifyToken}>Click here to verify your account</Button>
</section>