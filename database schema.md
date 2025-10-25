user table
fields: name, pwd , usertype:(admin, vendor, customer)

admin table
fields: id, name, email

vendor table
fields: id, name, email, (phone no), category, otherdata

customer table
fields: id, name, email, pno(phone no), total_budget,remaining_budget, profile link(url of profile photo), events(list contatining different event ids ), invitations(list contatining different invitation ids), storybook(list contatining different storybook ids) 

events table
fields: date, cid(customer id), eventid, event metadata

event category table
fields: event_id, event_name

gift category table
fields: gift_id, gift_name, image_url, gift_price, quantity_avialable_count


gift orders table
fields: order_id, gift_id, cid (customer id), address, invoice_id, purchase_amount

guest table
fields: name, cid(customer id), guest_id, guest_email_id, other_metadata


storybook table
fields: storybook_id, cid(customer id), book_link(url)

Invitation table
fields: event id, cid(customer id),guest_id, useremail_id(cutomer_email id), invite_url, INVITE_ID

social media post table
fields: postid, caption, cid(customer id), post image url, insta_handle_username



