extends Panel

func init(pdate, pauthor, pmessage):
	$Message.text = pmessage
	$Author.text = pauthor
	$Date.text = pdate