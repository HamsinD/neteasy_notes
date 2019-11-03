let express = require('express')
let cors = require('cors')
let app = express()
app.use(cors())
app.get('/demo',(req,res) => {
	setTimeout(() => {
		res.send({
			data:[
				{
					name:'ryan',age:30,sex:'man',
					name:'react',age:4,sex:'it'
				}
			],
			status:200,
			message:'ok'
		})
	},5000)
})

app.listen(6666)
